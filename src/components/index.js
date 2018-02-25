import Loading from './Loading/Loading';
import Navbar from './Navbar/Navbar';
import Fab from './Fab/Fab';

export default function(Vue, options) {
  Vue.component('Loading', Loading);
  Vue.component('Navbar', Navbar);
  Vue.component('Fab', Fab);
}
