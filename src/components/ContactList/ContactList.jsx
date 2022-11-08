import PropTypes from 'prop-types';
import { Item, Button } from './ContactList.styled';

export const ContactList = ({ contacts, onDelete }) => {
    return (
        <ul>
            {contacts.map(({ id, name, number }) => {
                return (
                    <Item key={id}>
                        {name}: {number}
                        <Button
                            onClick={() => {
                                onDelete(id);
                            }}
                        >
                            Delete
                        </Button>
                    </Item>
                )
            })}
        </ul>
    );
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.exact({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.number.isRequired,
        })
    ),
    onDelete: PropTypes.func.isRequired,
};