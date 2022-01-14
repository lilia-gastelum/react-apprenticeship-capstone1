import React from 'react';
import { Menu } from 'semantic-ui-react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const SideMenu = styled(Menu)({
  height: '100%',
  marginTop: '12% !important'
});

const Item = styled(Menu.Item)((props) => ({
  background: props.active
    ? `-webkit-linear-gradient(120deg,
  #833ab4 0,
  #fd1d1d 20%,
  #e36414 80%) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important
  `
    : 'transparent',
}));

function SideBar(props) {
  const history = useHistory();
  const { logout } = props;
  const [optionMenu, setOptionMenu] = React.useState('home');

  const changeMenu = (option) => {
    history.push(`/${option}`);
    setOptionMenu(option)
  };

  return (
    <SideMenu fluid vertical tabular>
      <Item
        icon="home"
        name="home"
        active={optionMenu === 'home'}
        onClick={() => changeMenu('home')}
      />
      <Item
        icon="heart outline"
        name="favorites"
        active={optionMenu === 'favorites'}
        onClick={() => changeMenu('favorites')}
      />
      <Item
        icon="clock outline"
        name="watchLater"
        active={optionMenu === 'watchLater'}
        onClick={() => changeMenu('watchLater')}
      />
      <Menu.Item name="logOut" icon="log out" onClick={() => logout()} />
    </SideMenu>
  );
}

export default SideBar;
