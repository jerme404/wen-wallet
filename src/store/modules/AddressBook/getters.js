const getters = {
    addressList: (state) => {

        /*
        return [{
            id: '123457',
            address: 'NV1KG123zv91VnBLrjqbVt7895EyqMCUbTYo57DErgo2YYuGYZtqzExSZPiv6ex78gKRBgs9QjXPC9VhmJsXokQs1iBVyFSm3',
            name: 'Test wallet 1',
            paymentId: '8ca5af8c40fab1385e8756dc1b4430ca48acb07b5990ee1949a9ff5ea82a5b49'
        },
        {
            id: '123456',
            address: 'NV1KGdLPzv85VnBLJjqbVtfqGWEyqMCUbTYo57DErgo2YYuGYZtqzExSZPiv6ex78gKRBgs9QjXPC9VhmJsXokQs1iBVyFSm3',
            name: 'Test wallet 2',
            paymentId: '9535af8540fab1385e8756dc1b4430ca48acb07b5990ee1949a9ff5ea82a5b49'
        }];
        */
        return Object.values(state.addresses);
    }
};

export default getters;
