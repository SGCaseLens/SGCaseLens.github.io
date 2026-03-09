window.sb = window.supabase.createClient(window.SG.supabaseUrl, window.SG.supabaseAnonKey);
function fmtDate(v){if(!v) return '-'; const d=new Date(v); return isNaN(d)?v:d.toLocaleDateString('en-SG')}
function days(a,b){if(!a||!b) return null; return Math.floor((new Date(b)-new Date(a))/86400000)}
