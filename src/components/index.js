import Loading from './Loading/Loading';
import Navbar from './Navbar/Navbar';
import Fab from './Fab/Fab';
import EmptyContent from './EmptyContent/EmptyContent'

export default function(Vue, options) {
  Vue.component('Loading', Loading);
  Vue.component('Navbar', Navbar);
  Vue.component('Fab', Fab);
  Vue.component('EmptyContent',EmptyContent);
}
