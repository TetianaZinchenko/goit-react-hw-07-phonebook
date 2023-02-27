import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Formik, Form, ErrorMessage } from 'formik';

import { toast } from 'react-toastify';

import { FormField, Input, Label } from './ContactForm.styled';

import Button from '../Button';

import * as contactsOperations from 'redux/operations';
import * as selectors from 'redux/selectors';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectors.getItems);

  const initialValues = {
    name: '',
    number: '',
  };

  const onSubmit = (values, { resetForm }) => {
    const { name } = values;
    const newName = checkName(name);

    if (newName) {
      toast.error(`Name ${name} is already in contacts`);
      return;
    }

    dispatch(contactsOperations.addContact(values));
    toast.success(`${values.name} was added to contacts!`);
    resetForm();
  };

  const checkName = newName => {
    const normalyzeName = newName.toLocaleLowerCase();
    return contacts.find(
      ({ name }) => name.toLocaleLowerCase() === normalyzeName
    );
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form>
          <FormField>
            <Label htmlFor="name">
              Contact Name
              <Input
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
              />
              <ErrorMessage name="name" component="div" />
            </Label>
          </FormField>

          <FormField>
            <Label htmlFor="number">
              Contact Number
              <Input
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
              />
            </Label>
            <ErrorMessage name="number" component="div" />
          </FormField>

          <Button type={'submit'} title={'Add Contact'} />
        </Form>
      </Formik>
    </div>
  );
};

export default ContactForm;
