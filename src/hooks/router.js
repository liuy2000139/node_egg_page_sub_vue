import router from '@/router'
const useRouter = () => {
  const { go, back, push, replace } =router
  return { go, back, push, replace }
}
export default  useRouter
