import { useSelector } from 'react-redux';

import * as selectors from 'redux/selectors';

import { Contacts } from './ContactList.styled';
import ContactListItem from 'components/ContactListItem';

export default function ContactList() {
  const items = useSelector(selectors.getItems);
  const filterValue = useSelector(selectors.getFilterValue);

  const showFilteredContacts = () => {
    const normalizedFilter = filterValue.toLocaleLowerCase();
    return items.filter(item =>
      item.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = showFilteredContacts();

  return (
    <Contacts>
      {filteredContacts.length > 0 ? (
        filteredContacts.map(item => (
          <ContactListItem key={item.id} item={item} />
        ))
      ) : (
        <div style={{ color: 'red', fontSize: '20px' }}>
          There are no contacts yet!
        </div>
      )}
    </Contacts>
  );
}
