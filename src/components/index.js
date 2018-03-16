import Loading from './Loading/Loading';
import Navbar from './Navbar/Navbar';
import Fab from './Fab/Fab';
import EmptyContent from './EmptyContent/EmptyContent'
import Modal from './Modal/Modal'
import Dropdown from './Dropdown/Dropdown'

export default function(Vue, options) {
  Vue.component('Loading', Loading);
  Vue.component('Navbar', Navbar);
  Vue.component('Fab', Fab);
  Vue.component('EmptyContent',EmptyContent);
  Vue.component('Modal', Modal)
  Vue.component('Dropdown', Dropdown)
}
