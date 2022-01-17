import React from 'react';
import { Menu } from 'semantic-ui-react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useAppContext } from "../../utils/contexts/AppContext";
import { useAuth } from '../../providers/Auth';

const SideMenu = styled(Menu)({
  height: '100%',
  marginTop: '12% !important',
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
  color: props.themeisdark === 'true' ? '#fff !important' : '#red !important'
}));

function SideBar() {
  const history = useHistory();
  const { logout } = useAuth();
  const { appContext } = useAppContext();
  const [optionMenu, setOptionMenu] = React.useState('home');

  const changeMenu = (option) => {
    history.push(`/${option}`);
    setOptionMenu(option)
  };

  return (
    <SideMenu fluid vertical tabular >
      <Item
        icon="home"
        name="home"
        active={optionMenu === 'home'}
        themeisdark={appContext.themeIsDark.toString()}
        onClick={() => changeMenu('home')}
      />
      <Item
        icon="heart outline"
        name="favorites"
        active={optionMenu === 'favorites'}
        themeisdark={appContext.themeIsDark.toString()}
        onClick={() => changeMenu('favorites')}
      />
      <Item
        icon="clock outline"
        name="watchLater"
        active={optionMenu === 'watchLater'}
        themeisdark={appContext.themeIsDark.toString()}
        onClick={() => changeMenu('watchLater')}
      />
      <Item 
      themeisdark={appContext.themeIsDark.toString()} 
      name="logOut" 
      icon="log out" 
      onClick={() => {
        logout();
      }} 
      />
    </SideMenu>
  );
}

export default SideBar;
