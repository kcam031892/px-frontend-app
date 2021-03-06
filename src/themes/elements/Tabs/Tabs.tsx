import { Tabs as MUITabs } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const Tabs = withStyles({
  root: {
    borderBottom: '1px solid #D9D9D9',
  },
  indicator: {
    backgroundColor: '#212121',
    height: '4px',
    borderRadius: '4px 4px 0px 0px',
  },
})(MUITabs);

export default Tabs;
