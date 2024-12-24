import {
  Tabbar,
  TabbarItem,
  Search,
  Icon,
  Image as VanImage,
  Swipe,
  SwipeItem,
  Lazyload,
  Grid,
  GridItem,
  Button,
  NavBar,
  Form,
  Field,
  Col,
  Row,
  TreeSelect,
  SwipeCell,
  Card,
  SubmitBar,
  Checkbox,
  CheckboxGroup,
  Stepper,
  Uploader,
  Cell,
  CellGroup,
  Sku,
  Tag,
  Tab,
  Tabs,
  Empty,
  AddressList,
  AddressEdit,
  ContactCard,
  DropdownMenu,
  DropdownItem,
  Popup,
  Area,
  Toast,
  CouponCell,
  CouponList,
  Dialog,
  RadioGroup,
  Radio,
  Loading,
  PullRefresh,
  List,
  Sticky,
  ActionSheet,
  Picker,
  Cascader ,
  DatetimePicker  ,
} from "vant";

// import "vant/lib/index.css";

let vantPlugins = [
  Tabbar,
  TabbarItem,
  Search,
  Icon,
  VanImage,
  Swipe,
  SwipeItem,
  Lazyload,
  Grid,
  GridItem,
  Button,
  NavBar,
  Form,
  Field,
  Col,
  Row,
  TreeSelect,
  SwipeCell,
  Card,
  SubmitBar,
  Checkbox,
  CheckboxGroup,
  Stepper,
  Uploader,
  Cell,
  CellGroup,
  Sku,
  Tag,
  Tab,
  Tabs,
  Empty,
  AddressList,
  AddressEdit,
  ContactCard,
  DropdownMenu,
  DropdownItem,
  Popup,
  Area,
  Toast,
  CouponCell,
  CouponList,
  Dialog,
  RadioGroup,
  Radio,
  Loading ,
  PullRefresh,
  List,
  Sticky ,
  ActionSheet  ,
  Picker,
  Cascader,
  DatetimePicker ,
];

export default (Vue) => {
  vantPlugins.forEach((plugin) => {
    Vue.use(plugin);
  });
};
