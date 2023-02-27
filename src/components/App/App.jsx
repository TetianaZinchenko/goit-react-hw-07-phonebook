import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Container, AppTitle } from './App.styled';

import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import Section from 'components/Section';
import { Loader } from 'components/Loader';

import { useEffect } from 'react';

import * as contactsOperations from 'redux/operations';
import * as selectors from 'redux/selectors';

const App = ({ title }) => {
  const dispatch = useDispatch();
  const items = useSelector(selectors.getItems);
  const isLoading = useSelector(selectors.getLoadingStatus);

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);

  return (
    <Container>
      <AppTitle>{title}</AppTitle>
      <Section>
        <ContactForm />
      </Section>
      <Section title="Contacts">
        {isLoading && <Loader />}
        {!isLoading && items.length === 0 && (
          <div style={{ color: 'red', fontSize: '20px' }}>No any contacts!</div>
        )}
        {items.length > 0 && (
          <>
            <Filter />
            <ContactList />
          </>
        )}
      </Section>
      <ToastContainer autoClose={3000} theme={'colored'} />
    </Container>
  );
};

export default App;

App.propTypes = {
  title: PropTypes.string,
};
