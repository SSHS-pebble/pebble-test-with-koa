const React = require("react");
const {
    Collapse,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    withStyles
} = require("@material-ui/core");
const {
    CompareArrows: MoveSeatIcon,
    ExpandLess: ExpandLessIcon,
    ExpandMore: ExpandMoreIcon,
    School: SchoolIcon
} = require("@material-ui/icons");
const { connect } = require("react-redux");

const actions = require("../redux/actions.js");

const styles = theme => ({
    drawer: {
        width: 256
    },
    nestedListItem: {
        paddingLeft: theme.spacing.unit * 4
    }
});

module.exports = withStyles(styles)(connect(state => state, actions)(props => (
    <Drawer open={props.drawer.isDrawerOpen} onClose={props.toggleDrawer}>
      <List component="nav" className={props.classes.drawer}>
        <ListItem button onClick={e => props.toggleDrawerItem("Notice")}>
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText inset>공지사항</ListItemText>
          {props.drawer.isNoticeOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={props.drawer.isNoticeOpen}>
          <List>
            <ListItem button className={props.classes.nestedListItem}>
              <ListItemText>연구</ListItemText>
            </ListItem>
            <ListItem button className={props.classes.nestedListItem}>
              <ListItemText>행사</ListItemText>
            </ListItem>
            <ListItem button className={props.classes.nestedListItem}>
              <ListItemText>학사일정</ListItemText>
            </ListItem>
          </List>
        </Collapse>
        <ListItem button onClick={e => props.toggleDrawerItem("MoveSeat")}>
          <ListItemIcon>
            <MoveSeatIcon />
          </ListItemIcon>
          <ListItemText inset>이석</ListItemText>
          {props.drawer.isMoveSeatOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={props.drawer.isMoveSeatOpen}>
          <List>
            <ListItem button className={props.classes.nestedListItem}>
              <ListItemText>1학년 공강실</ListItemText>
            </ListItem>
            <ListItem button className={props.classes.nestedListItem}>
              <ListItemText>2학년 공강실</ListItemText>
            </ListItem>
            <ListItem button className={props.classes.nestedListItem}>
              <ListItemText>3학년 공강실</ListItemText>
            </ListItem>
            <ListItem button className={props.classes.nestedListItem}>
              <ListItemText>세미나실</ListItemText>
            </ListItem>
            <ListItem button className={props.classes.nestedListItem}>
              <ListItemText>단체 이석</ListItemText>
            </ListItem>
            <ListItem button className={props.classes.nestedListItem}>
              <ListItemText>이석 명단 확인</ListItemText>
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Drawer>
)));
