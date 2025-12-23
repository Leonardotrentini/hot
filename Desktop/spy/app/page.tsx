import { redirect } from 'next/navigation'

export default function Home() {
  // Redirecionar direto para explorar (sem login)
  redirect('/explorar')
}

