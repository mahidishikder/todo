
import axios from "axios"


const axiosPublic = axios.create({
  baseURL: 'http://localhost:5000'
})
function useAxiosPublic() {
  return axiosPublic
}
// https://y-blond-psi.vercel.app

export default useAxiosPublic