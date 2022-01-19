import React, { useState } from 'react';
import { Button, Form, Header, Icon, Loader, Modal } from 'semantic-ui-react';

import { useAuth } from '../../providers/Auth';
import './Login.styles.css';

function LoginPage({ open, setOpen }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function authenticate() {
    if (username !== '' && password !== '') {
      setLoading(true);
      login(username, password).then(() => {
        setOpen(false);
        setLoading(false);
        setUsername('');
        setPassword('');
      }).catch(error => {
        setMessage(error.message)
        setLoading(false);
      })

    }
  }

  return (

    <Modal
      basic
      dimmer={'blurring'}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
    >
      <Header icon>
        <Icon name='user' />
        Log In
      </Header>
      <Modal.Content>
        <p>
          Walcome back!
        </p>
        <Form>
          <Form.Input
            required
            label={"Username"}
            placeholder={"username"}
            title={"username"}
            type="text"
            value={username}
            onChange={(e) => {
              setMessage('');
              setUsername(e.target.value)
            }}
          />
          <br />
          <Loader disabled={!loading} />
          <Form.Input
            required
            type="password"
            label={"Password"}
            title={"password"}
            value={password}
            onChange={(e) => {
              setMessage('');
              setPassword(e.target.value)
            }}
          />
        </Form>
        <label>{message}</label>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> Cancel
        </Button>
        <Button type='button' color='green' inverted onClick={() => authenticate()}>
          <Icon name='sign in' /> Log In
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default LoginPage;
