import React from 'react';
import { useHistory } from 'react-router-dom';
import { Checkbox, Dropdown, Icon, Input, Menu } from 'semantic-ui-react';
import { useAuth } from '../../providers/Auth';
import styled from 'styled-components';
import { useAppContext } from "../../utils/contexts/AppContext";


const TopMenu = styled(Menu)({
  backgroundImage: `
  -webkit-linear-gradient(120deg,
    #e36414 0,
    #fd1d1d 50%,
    #833ab4 100%) !important;`,
  height: '8%',
});

const Item = styled(Menu.Item)({
  color: '#fff !important',
});

const UserMenu = styled(Dropdown)({
  color: '#fff !important',
});

const Search = styled(Menu.Item)({
  width: '50% !important',
});

const SearchInput = styled(Input)({
  width: '100% !important',
});

function Header() {
  const { authenticated, user, logout } = useAuth();
  const { appContext, setAppContext } = useAppContext();
  const history = useHistory();

  const onKeyPress = (event) => {
    if (event.key === 'Enter' && event.target.value !== '') {
      setAppContext({...appContext, term: event.target.value});
    }
  };

  return (
    <TopMenu fixed="top">
      <Item header onClick={() => history.push('/home')}><h3>Wizeline</h3></Item>
      <Search>
        <SearchInput
          className="icon search"
          icon="search"
          placeholder="Buscar..."
          onKeyPress={(e) => onKeyPress(e)}
        />
      </Search>
      <Menu.Menu position="right">
        <Item>
          <Icon name="sun" />
          <Checkbox slider onChange={() => setAppContext({...appContext, themeIsDark: !appContext.themeIsDark})} />
          <Icon name="moon" />
        </Item>
        {!authenticated ? (
          <Item
            name="log in"
            onClick={() => {
              history.push('/login');
            }}
          />
        ) : (
          <UserMenu item text={user ? user.username : '@username'}>
            <Dropdown.Menu>
              <Dropdown.Item>Home</Dropdown.Item>
              <Dropdown.Item>Favorites</Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  logout();
                }}
              >
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </UserMenu>
        )}
      </Menu.Menu>
    </TopMenu>
  );
}

export default Header;
