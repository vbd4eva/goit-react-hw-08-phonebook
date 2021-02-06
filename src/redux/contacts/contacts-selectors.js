export const getContactsError = state => state.contacts.error;
export const getIsLoading = state => state.contacts.isLoading;
export const getContacts = state => state.contacts.items;
export const getFilterValue = state => state.contacts.filter;
export const getContactListLength = state => state.contacts.items.length;

export const getFilteredContactList = state => {
    const contactCards = getContacts(state);
    const filterValue = getFilterValue(state);

    return contactCards.filter(
        ({ name }) => name.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
    );
}

