import {
  Alert as EAlert,
  Aside as EAside,
  Autocomplete as EAutocomplete,
  Backtop as EBacktop,
  Badge as EBadge,
  Breadcrumb as EBreadcrumb,
  BreadcrumbItem as EBreadcrumbItem,
  Button as EButton,
  ButtonGroup as EButtonGroup,
  Calendar as ECalendar,
  Card as ECard,
  Carousel as ECarousel,
  CarouselItem as ECarouselItem,
  Cascader as ECascader,
  // CascaderPanel as ECascaderPanel,
  Checkbox as ECheckbox,
  CheckboxButton as ECheckboxButton,
  CheckboxGroup as ECheckboxGroup,
  Col as ECol,
  Collapse as ECollapse,
  CollapseItem as ECollapseItem,
  ColorPicker as EColorPicker,
  Container as EContainer,
  DatePicker as EDatePicker,
  Dialog as EDialog,
  Divider as EDivider,
  Dropdown as EDropdown,
  DropdownItem as EDropdownItem,
  DropdownMenu as EDropdownMenu,
  Footer as EFooter,
  Form as EForm,
  FormItem as EFormItem,
  Header as EHeader,
  Icon as EIcon,
  Image as EImage,
  Input as EInput,
  InputNumber as EInputNumber,
  Link as ELink,
  Main as EMain,
  Menu as EMenu,
  MenuItem as EMenuItem,
  MenuItemGroup as EMenuItemGroup,
  Option as EOption,
  OptionGroup as EOptionGroup,
  PageHeader as EPageHeader,
  Pagination as EPagination,
  Popover as EPopover,
  Progress as EProgress,
  Radio as ERadio,
  RadioButton as ERadioButton,
  RadioGroup as ERadioGroup,
  Rate as ERate,
  Row as ERow,
  Select as ESelect,
  Slider as ESlider,
  Step as EStep,
  Steps as ESteps,
  Submenu as ESubmenu,
  Switch as ESwitch,
  // Spinner as ESpinner,
  Table as ETable,
  TableColumn as ETableColumn,
  TabPane as ETabPane,
  Tabs as ETabs,
  Tag as ETag,
  Timeline as ETimeline,
  TimelineItem as ETimelineItem,
  TimePicker as ETimePicker,
  TimeSelect as ETimeSelect,
  Tooltip as ETooltip,
  Transfer as ETransfer,
  Tree as ETree,
  Upload as EUpload,

  Loading as ELoading,
  Message as EMessage,
  MessageBox as EMessageBox,
  Notification as ENotification,
} from 'element-ui';
import Vue from 'vue';
import { ofType } from 'vue-tsx-support';

type OmitVue<T> = Partial<Omit<T, keyof Vue>>;
interface AnyScopedSlots {
  [key: string]: any;
}

export const Loading = ELoading;
export const Message = EMessage;
export const MessageBox = EMessageBox;
export const Notification = ENotification;

export const Pagination = ofType<OmitVue<EPagination>, {}, AnyScopedSlots>().convert(EPagination);
export const Dialog = ofType<OmitVue<EDialog>, {}, AnyScopedSlots>().convert(EDialog);
export const Autocomplete = ofType<OmitVue<EAutocomplete>, {}, AnyScopedSlots>().convert(EAutocomplete);
export const Dropdown = ofType<OmitVue<EDropdown>, {}, AnyScopedSlots>().convert(EDropdown);
export const DropdownMenu = ofType<OmitVue<EDropdownMenu>, {}, AnyScopedSlots>().convert(EDropdownMenu);
export const DropdownItem = ofType<OmitVue<EDropdownItem>, {}, AnyScopedSlots>().convert(EDropdownItem);
export const Menu = ofType<OmitVue<EMenu>, {}, AnyScopedSlots>().convert(EMenu);
export const Submenu = ofType<OmitVue<ESubmenu>, {}, AnyScopedSlots>().convert(ESubmenu);
export const MenuItem = ofType<OmitVue<EMenuItem>, {}, AnyScopedSlots>().convert(EMenuItem);
export const MenuItemGroup = ofType<OmitVue<EMenuItemGroup>, {}, AnyScopedSlots>().convert(EMenuItemGroup);
export const Input = ofType<OmitVue<EInput>, {}, AnyScopedSlots>().convert(EInput);
export const InputNumber = ofType<OmitVue<EInputNumber>, {}, AnyScopedSlots>().convert(EInputNumber);
export const Radio = ofType<OmitVue<ERadio>, {}, AnyScopedSlots>().convert(ERadio);
export const RadioGroup = ofType<OmitVue<ERadioGroup>, {}, AnyScopedSlots>().convert(ERadioGroup);
export const RadioButton = ofType<OmitVue<ERadioButton>, {}, AnyScopedSlots>().convert(ERadioButton);
export const Checkbox = ofType<OmitVue<ECheckbox>, {}, AnyScopedSlots>().convert(ECheckbox);
export const CheckboxButton = ofType<OmitVue<ECheckboxButton>, {}, AnyScopedSlots>().convert(ECheckboxButton);
export const CheckboxGroup = ofType<OmitVue<ECheckboxGroup>, {}, AnyScopedSlots>().convert(ECheckboxGroup);
export const Switch = ofType<OmitVue<ESwitch>, {}, AnyScopedSlots>().convert(ESwitch);
export const Select = ofType<OmitVue<ESelect>, {}, AnyScopedSlots>().convert(ESelect);
export const Option = ofType<OmitVue<EOption>, {}, AnyScopedSlots>().convert(EOption);
export const OptionGroup = ofType<OmitVue<EOptionGroup>, {}, AnyScopedSlots>().convert(EOptionGroup);
export const Button = ofType<OmitVue<EButton>, {}, AnyScopedSlots>().convert(EButton);
export const ButtonGroup = ofType<OmitVue<EButtonGroup>, {}, AnyScopedSlots>().convert(EButtonGroup);
export const Table = ofType<OmitVue<ETable>, {}, AnyScopedSlots>().convert(ETable);
export const TableColumn = ofType<OmitVue<ETableColumn>, {}, AnyScopedSlots>().convert(ETableColumn);
export const DatePicker = ofType<OmitVue<EDatePicker>, {}, AnyScopedSlots>().convert(EDatePicker);
export const TimeSelect = ofType<OmitVue<ETimeSelect>, {}, AnyScopedSlots>().convert(ETimeSelect);
export const TimePicker = ofType<OmitVue<ETimePicker>, {}, AnyScopedSlots>().convert(ETimePicker);
export const Popover = ofType<OmitVue<EPopover>, {}, AnyScopedSlots>().convert(EPopover);
export const Tooltip = ofType<OmitVue<ETooltip>, {}, AnyScopedSlots>().convert(ETooltip);
export const Breadcrumb = ofType<OmitVue<EBreadcrumb>, {}, AnyScopedSlots>().convert(EBreadcrumb);
export const BreadcrumbItem = ofType<OmitVue<EBreadcrumbItem>, {}, AnyScopedSlots>().convert(EBreadcrumbItem);
export const Form = ofType<OmitVue<EForm>, {}, AnyScopedSlots>().convert(EForm);
export const FormItem = ofType<OmitVue<EFormItem>, {}, AnyScopedSlots>().convert(EFormItem);
export const Tabs = ofType<OmitVue<ETabs>, {}, AnyScopedSlots>().convert(ETabs);
export const TabPane = ofType<OmitVue<ETabPane>, {}, AnyScopedSlots>().convert(ETabPane);
export const Tag = ofType<OmitVue<ETag>, {}, AnyScopedSlots>().convert(ETag);
export const Tree = ofType<OmitVue<ETree>, {}, AnyScopedSlots>().convert(ETree);
export const Alert = ofType<OmitVue<EAlert>, {}, AnyScopedSlots>().convert(EAlert);
export const Slider = ofType<OmitVue<ESlider>, {}, AnyScopedSlots>().convert(ESlider);
export const Icon = ofType<OmitVue<EIcon>, {}, AnyScopedSlots>().convert(EIcon);
export const Row = ofType<OmitVue<ERow>, {}, AnyScopedSlots>().convert(ERow);
export const Col = ofType<OmitVue<ECol>, {}, AnyScopedSlots>().convert(ECol);
export const Upload = ofType<OmitVue<EUpload>, {}, AnyScopedSlots>().convert(EUpload);
export const Progress = ofType<OmitVue<EProgress>, {}, AnyScopedSlots>().convert(EProgress);
// export const Spinner = ofType<OmitVue<ESpinner>,{},AnyScopedSlots>().convert(Spinner)E;
export const Badge = ofType<OmitVue<EBadge>, {}, AnyScopedSlots>().convert(EBadge);
export const Card = ofType<OmitVue<ECard>, {}, AnyScopedSlots>().convert(ECard);
export const Rate = ofType<OmitVue<ERate>, {}, AnyScopedSlots>().convert(ERate);
export const Steps = ofType<OmitVue<ESteps>, {}, AnyScopedSlots>().convert(ESteps);
export const Step = ofType<OmitVue<EStep>, {}, AnyScopedSlots>().convert(EStep);
export const Carousel = ofType<OmitVue<ECarousel>, {}, AnyScopedSlots>().convert(ECarousel);
export const CarouselItem = ofType<OmitVue<ECarouselItem>, {}, AnyScopedSlots>().convert(ECarouselItem);
export const Collapse = ofType<OmitVue<ECollapse>, {}, AnyScopedSlots>().convert(ECollapse);
export const CollapseItem = ofType<OmitVue<ECollapseItem>, {}, AnyScopedSlots>().convert(ECollapseItem);
export const Cascader = ofType<OmitVue<ECascader>, {}, AnyScopedSlots>().convert(ECascader);
export const ColorPicker = ofType<OmitVue<EColorPicker>, {}, AnyScopedSlots>().convert(EColorPicker);
export const Transfer = ofType<OmitVue<ETransfer>, {}, AnyScopedSlots>().convert(ETransfer);
export const Container = ofType<OmitVue<EContainer>, {}, AnyScopedSlots>().convert(EContainer);
export const Header = ofType<OmitVue<EHeader>, {}, AnyScopedSlots>().convert(EHeader);
export const Aside = ofType<OmitVue<EAside>, {}, AnyScopedSlots>().convert(EAside);
export const Main = ofType<OmitVue<EMain>, {}, AnyScopedSlots>().convert(EMain);
export const Footer = ofType<OmitVue<EFooter>, {}, AnyScopedSlots>().convert(EFooter);
export const Timeline = ofType<OmitVue<ETimeline>, {}, AnyScopedSlots>().convert(ETimeline);
export const TimelineItem = ofType<OmitVue<ETimelineItem>, {}, AnyScopedSlots>().convert(ETimelineItem);
export const Link = ofType<OmitVue<ELink>, {}, AnyScopedSlots>().convert(ELink);
export const Divider = ofType<OmitVue<EDivider>, {}, AnyScopedSlots>().convert(EDivider);
export const Image = ofType<OmitVue<EImage>, {}, AnyScopedSlots>().convert(EImage);
export const Calendar = ofType<OmitVue<ECalendar>, {}, AnyScopedSlots>().convert(ECalendar);
export const Backtop = ofType<OmitVue<EBacktop>, {}, AnyScopedSlots>().convert(EBacktop);
export const PageHeader = ofType<OmitVue<EPageHeader>, {}, AnyScopedSlots>().convert(EPageHeader);
// export const CascaderPanel = ofType<OmitVue<ECascaderPanel>,{},AnyScopedSlots>().convert(CascaderPanel)E;
