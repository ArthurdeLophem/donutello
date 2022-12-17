import router from '../router';

const redirect = () => {
    if (window.innerWidth < 720) {
        router.push("/mobile")
    }
}
export default redirect;