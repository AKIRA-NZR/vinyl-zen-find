import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Disc3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export default function Auth() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupName, setSignupName] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(loginEmail, loginPassword);
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success('ようこそ！/ Bem-vindo!');
    navigate('/');
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signUp(signupEmail, signupPassword, signupName);
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success('確認メールを送信しました / Email de confirmação enviado!');
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <Disc3 className="h-12 w-12 text-primary mx-auto mb-4" />
          <h1 className="text-2xl font-bold"><span className="text-primary">盤</span> Vinyl Zen</h1>
        </div>

        <Card className="bg-card border-border">
          <Tabs defaultValue="login">
            <CardHeader>
              <TabsList className="w-full">
                <TabsTrigger value="login" className="flex-1">ログイン / Login</TabsTrigger>
                <TabsTrigger value="signup" className="flex-1">登録 / Cadastro</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <Input placeholder="メール / Email" type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} required className="bg-secondary" />
                  <Input placeholder="パスワード / Senha" type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} required className="bg-secondary" />
                  <Button type="submit" className="w-full" disabled={loading}>{loading ? '...' : 'ログイン / Entrar'}</Button>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <Input placeholder="名前 / Nome" value={signupName} onChange={e => setSignupName(e.target.value)} required className="bg-secondary" />
                  <Input placeholder="メール / Email" type="email" value={signupEmail} onChange={e => setSignupEmail(e.target.value)} required className="bg-secondary" />
                  <Input placeholder="パスワード / Senha" type="password" value={signupPassword} onChange={e => setSignupPassword(e.target.value)} required minLength={6} className="bg-secondary" />
                  <Button type="submit" className="w-full" disabled={loading}>{loading ? '...' : '登録 / Cadastrar'}</Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </motion.div>
    </main>
  );
}
