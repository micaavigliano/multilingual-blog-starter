import { createFileRoute } from '@tanstack/react-router'
import Hello from '@/components/Hello'
import { useSEO } from '@/hook/useSEO'

export const Route = createFileRoute('/$locale/')({
  component: Home,
})

function Home() {
  useSEO()
  return <Hello />
}