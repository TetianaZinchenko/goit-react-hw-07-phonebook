import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import { HiOutlineUserCircle, HiOutlinePhone } from 'react-icons/hi';
import { FaRegTrashAlt } from 'react-icons/fa';

import {
  Contact,
  ContactName,
  ContactNumber,
  Container,
  MainContainer,
} from './ContactListItem.styled';

import * as contactsOperations from 'redux/operations';

import IconButton from 'components/IconButton';

export default function ContactListItem({ item: { id, name, phone } }) {
  const dispatch = useDispatch();

  return (
    <Contact>
      <MainContainer>
        <Container>
          <HiOutlineUserCircle size={20} color="#400080" />
          <ContactName>{name}</ContactName>
        </Container>
        <Container>
          <HiOutlinePhone size={20} color="#400080" />
          <ContactNumber>{phone}</ContactNumber>
        </Container>
      </MainContainer>

      <IconButton
        type="button"
        aria-label="For delete contact"
        onClick={() => dispatch(contactsOperations.deleteContact({ id, name }))}
      >
        <FaRegTrashAlt />
      </IconButton>
    </Contact>
  );
}

ContactListItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
};
