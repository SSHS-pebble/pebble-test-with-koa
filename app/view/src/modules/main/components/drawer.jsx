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
    Restaurant: MealIcon,
    School: SchoolIcon
} = require("@material-ui/icons");
const { Link } = require("react-router-dom");
const { connect } = require("react-redux");

const actions = require("../actions.js");

const styles = theme => ({
    drawer: {
        width: 256
    },
    nestedListItem: {
        paddingLeft: theme.spacing.unit * 4
    }
});

const DrawerSublist = props => (
    <React.Fragment>
      <ListItem button onClick={props.onToggle}>
        <ListItemIcon>
          {props.icon}
        </ListItemIcon>
        <ListItemText inset>{props.title}</ListItemText>
        {props.isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={props.isOpen}>
        <List>
          {props.subItem.map(item => props.children(item))}
        </List>
      </Collapse>
    </React.Fragment>
);

module.exports = withStyles(styles)(connect(state => ({ main: state.main }), actions)(props => (
    <Drawer open={props.main.isDrawerOpen} onClose={props.toggleDrawer}>
      <List component="nav" className={props.classes.drawer}>
        <li>
          <ListItem button component={Link} to="/meal">
            <ListItemIcon>
              <MealIcon />
            </ListItemIcon>
            <ListItemText>학교 급식</ListItemText>
          </ListItem>
        </li>
        <DrawerSublist onToggle={e => props.toggleDrawerItem("Notice")} title="공지사항" icon={<SchoolIcon />} subItem={[{ name: "연구", to: "/notice/research" },{ name: "행사", to: "/notice/event" }, { name: "학사일정", to: "/notice/calendar"}]} isOpen={props.main.isNoticeOpen}>
          {item => (
              <li>
                <ListItem button className={props.classes.nestedListItem} component={Link} to={item.to}>
                  <ListItemText>{item.name}</ListItemText>
                </ListItem>
              </li>
          )}
        </DrawerSublist>
        <DrawerSublist onToggle={e => props.toggleDrawerItem("MoveSeat")} title="이석" icon={<MoveSeatIcon />} subItem={[{ name: "1학년 공강실", to: "/move-seat/grade/1" }, { name: "2학년 공강실", to: "/move-seat/grade/2" }, { name: "3학년 공강실", to: "/move-seat/grade/3" }, { name: "세미나실", to: "/move-seat/seminar" }, { name: "단체 이석", to: "/move-seat/group" }, { name: "이석 명단 확인", to: "/move-seat/list" }]} isOpen={props.main.isMoveSeatOpen}>
          {item => (
              <li>
                <ListItem button className={props.classes.nestedListItem} component={Link} to={item.to}>
                  <ListItemText>{item.name}</ListItemText>
                </ListItem>
              </li>
          )}
        </DrawerSublist>
      </List>
    </Drawer>
)));
