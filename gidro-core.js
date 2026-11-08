/* Gidro shared core: accounts (Supabase), memberships, progress sync, language.
   Used by Gidro School (school.html) and Gidro Everyday (everyday.html). */
(function(){
  const SUPABASE_URL = "https://nrfcfsxoowwhkfwretkf.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_BmpyUt7KqgG6tKx0XEiKCw_UJQL_NOD";

  /* Stripe payment links (live). Change prices in Stripe, then paste the new links here. */
  const PAY = {
    school:   { monthly: "https://buy.stripe.com/4gM6oI14bdL78KM2rYeME0C", yearly: "https://buy.stripe.com/bJe6oI4gndL7gde5EaeME0D",
                price: { monthly: "$7.99", yearly: "$59.99" } },
    everyday: { monthly: "https://buy.stripe.com/bJe3cw8wD8qNaSU7MieME0E", yearly: "https://buy.stripe.com/9B63cwfZ5bCZaSUd6CeME0F",
                price: { monthly: "$4.99", yearly: "$39.99" } }
  };

  const sb = (window.supabase && window.supabase.createClient) ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

  const store = {
    get(k, d){ try{ const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); }catch(e){ return d; } },
    set(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }
  };

  /* progress "tags" live in profiles.completed (a list of short strings), so no database change is needed:
     "s:pre:1:1:3@2026-11-08"  a finished school day (class:month:week:day) with the date
     "e:airport"               an Everyday set studied
     "plan:school" / "plan:everyday"  memberships, written by the Stripe webhook */
  const G = {
    sb, PAY, store,
    user: null, profile: null,
    tags: new Set(store.get('gidroGuestTags', []).filter(t => typeof t === 'string' && !t.startsWith('plan:'))),
    lang: (function(){ const s = store.get('gidroLangV2', null); if (s === 'en' || s === 'fr') return s;
      try{ const old = localStorage.getItem('gidroLang'); if (old === 'fr' || old === 'en') return old; }catch(e){}
      return (navigator.language || '').toLowerCase().startsWith('fr') ? 'fr' : 'en'; })(),
    xp: store.get('gidroGuestXp', 0),
    streak: store.get('gidroGuestStreak', 0),
    lastActive: store.get('gidroGuestLast', null),
    listeners: [],
    onChange(fn){ this.listeners.push(fn); },
    emit(){ this.listeners.forEach(f => { try{ f(); }catch(e){ console.error(e); } }); },

    setLang(l){ this.lang = l; store.set('gidroLangV2', l); try{ localStorage.setItem('gidroLang', l); }catch(e){} document.documentElement.lang = l; },

    /* Owner test mode: this account opens everything, in any order (for testing only) */
    OWNERS: ['nosymasina@gmail.com'],
    isOwner(){ return !!(this.user && this.user.email && this.OWNERS.includes(this.user.email.toLowerCase())); },

    has(plan){
      if (this.isOwner()) return true;
      if (this.tags.has('plan:' + plan)) return true;
      // accounts upgraded under the old single Gidro Pro plan keep full access
      if (this.profile && this.profile.is_premium && ![...this.tags].some(t => t.startsWith('plan:'))) return true;
      return false;
    },

    today(){ const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0'); },

    touchStreak(){
      const t = this.today();
      if (this.lastActive === t) return;
      const y = new Date(); y.setDate(y.getDate() - 1);
      const ys = y.getFullYear() + '-' + String(y.getMonth()+1).padStart(2,'0') + '-' + String(y.getDate()).padStart(2,'0');
      this.streak = (this.lastActive === ys) ? this.streak + 1 : 1;
      this.lastActive = t;
    },
    checkStreak(){
      if (!this.lastActive) return;
      const last = new Date(this.lastActive + 'T00:00:00'), now = new Date(this.today() + 'T00:00:00');
      if ((now - last) / 86400000 > 1) this.streak = 0;
    },

    addTag(tag, xp){
      this.tags.add(tag);
      if (xp) this.xp += xp;
      this.touchStreak();
      return this.save();
    },
    removeTagsWhere(fn){ [...this.tags].forEach(t => { if (fn(t)) this.tags.delete(t); }); return this.save(); },

    async save(){
      store.set('gidroGuestTags', [...this.tags].filter(t => !t.startsWith('plan:')));
      store.set('gidroGuestXp', this.xp); store.set('gidroGuestStreak', this.streak); store.set('gidroGuestLast', this.lastActive);
      if (!sb || !this.user) return;
      const { error } = await sb.from('profiles').update({
        completed: [...this.tags], xp: this.xp, streak: this.streak, last_active: this.lastActive
      }).eq('id', this.user.id);
      if (error) console.error('save error', error);
    },

    async loadProfile(){
      if (!sb || !this.user) return;
      let { data, error } = await sb.from('profiles').select('*').eq('id', this.user.id).maybeSingle();
      if (error) { console.error('profile error', error); return; }
      if (!data) {
        const ins = await sb.from('profiles').insert({ id: this.user.id, xp: 0, streak: 0, completed: [], is_premium: false }).select().single();
        if (ins.error) { console.error('create profile error', ins.error); return; }
        data = ins.data;
      }
      this.profile = data;
      // merge what was done as a guest on this device into the account
      const guest = store.get('gidroGuestTags', []).filter(t => typeof t === 'string' && !t.startsWith('plan:'));
      const merged = new Set([...(Array.isArray(data.completed) ? data.completed : []), ...guest]);
      const changed = merged.size !== (Array.isArray(data.completed) ? data.completed.length : 0);
      this.tags = merged;
      this.xp = Math.max(data.xp || 0, store.get('gidroGuestXp', 0));
      this.streak = data.streak || 0;
      this.lastActive = data.last_active || this.lastActive;
      this.checkStreak();
      if (changed) await this.save();
    },

    async refreshProfile(){
      if (!sb || !this.user) return;
      const { data } = await sb.from('profiles').select('*').eq('id', this.user.id).maybeSingle();
      if (data) { this.profile = data; (data.completed || []).forEach(t => this.tags.add(t)); }
    },

    async start(){
      this.checkStreak();
      if (!sb) { this.emit(); return; }
      const { data } = await sb.auth.getSession();
      if (data.session && data.session.user) { this.user = data.session.user; await this.loadProfile(); }
      this.emit();
      sb.auth.onAuthStateChange(async (ev, session) => {
        const u = session && session.user;
        if (u && (!this.user || this.user.id !== u.id)) { this.user = u; await this.loadProfile(); this.emit(); }
        if (!u && this.user) { this.user = null; this.profile = null; this.tags = new Set(); this.xp = 0; this.streak = 0;
          store.set('gidroGuestTags', []); store.set('gidroGuestXp', 0); this.emit(); }
      });
      if (new URLSearchParams(location.search).get('upgraded') === '1') this.pollUpgrade(0);
    },

    async pollUpgrade(n){
      if (n > 10 || !this.user) return;
      await new Promise(r => setTimeout(r, 4000));
      await this.refreshProfile();
      if (this.has('school') || this.has('everyday')) { this.emit(); history.replaceState(null, '', location.pathname); return; }
      this.pollUpgrade(n + 1);
    },

    async signIn(email, password){ return sb.auth.signInWithPassword({ email, password }); },
    async signUp(email, password){ return sb.auth.signUp({ email, password }); },
    async resetPassword(email){ return sb.auth.resetPasswordForEmail(email, { redirectTo: location.origin + location.pathname }); },
    async signOut(){ await sb.auth.signOut(); },

    checkout(plan, period){
      const base = PAY[plan][period];
      location.href = base + '?prefilled_email=' + encodeURIComponent(this.user.email) + '&client_reference_id=' + encodeURIComponent(this.user.id);
    }
  };

  window.G = G;
})();
