import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, LogOut, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Profile as ProfileType } from '@/lib/types';
import { toast } from 'sonner';

export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (!user) { navigate('/auth'); return; }
    const fetchProfile = async () => {
      const { data } = await supabase.from('profiles').select('*').eq('user_id', user.id).single();
      if (data) {
        const p = data as any as ProfileType;
        setProfile(p);
        setDisplayName(p.display_name ?? '');
        setPhone(p.phone ?? '');
        setAddress(p.address ?? '');
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user, navigate]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from('profiles').update({
      display_name: displayName,
      phone,
      address,
    }).eq('user_id', user.id);
    setSaving(false);
    if (error) { toast.error('Erro ao salvar'); return; }
    toast.success('保存しました / Perfil salvo!');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) return <div className="container mx-auto p-8"><div className="h-96 bg-card animate-pulse rounded-lg max-w-md mx-auto" /></div>;

  return (
    <main className="container mx-auto px-4 py-8 max-w-md">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="bg-card border-border">
          <CardHeader className="text-center">
            <div className="mx-auto h-20 w-20 rounded-full bg-secondary flex items-center justify-center mb-4">
              <User className="h-10 w-10 text-primary" />
            </div>
            <CardTitle><span className="text-primary">プロフィール</span> / Perfil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">メール / Email</label>
              <Input value={user?.email ?? ''} disabled className="bg-muted" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">名前 / Nome</label>
              <Input value={displayName} onChange={e => setDisplayName(e.target.value)} className="bg-secondary" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">電話 / Telefone</label>
              <Input value={phone} onChange={e => setPhone(e.target.value)} className="bg-secondary" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">住所 / Endereço</label>
              <Input value={address} onChange={e => setAddress(e.target.value)} className="bg-secondary" />
            </div>
            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave} disabled={saving} className="flex-1 gap-2">
                <Save className="h-4 w-4" /> {saving ? '...' : '保存 / Salvar'}
              </Button>
              <Button variant="outline" onClick={handleSignOut} className="gap-2">
                <LogOut className="h-4 w-4" /> サインアウト
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}
