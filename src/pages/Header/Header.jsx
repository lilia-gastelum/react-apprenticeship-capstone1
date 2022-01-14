import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Checkbox, Dropdown, Icon, Input, Menu } from 'semantic-ui-react';
import { useAuth } from '../../providers/Auth';
import styled from 'styled-components';
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

function Header({ setTerm }) {
  const { authenticated, user, logout } = useAuth();
  const history = useHistory();

  const onKeyPress = (event) => {
    if (event.key === 'Enter' && event.target.value !== '') {
      setTerm(event.target.value);
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
          <Checkbox slider />
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
          <UserMenu item text={user ? user.username : '@wizeline'}>
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

Header.propTypes = {
  setTerm: PropTypes.func
};


export default Header;
