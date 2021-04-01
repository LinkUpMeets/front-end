import * as allFormActions from './formActionStatus';

export const NEXT_FORM = (data) => ({
    type: allFormActions.NEXT_FORM,
    payload: data
});

export const moveToNextForm = (formData) => {
    return async dispatch => {
        try {
            return dispatch(NEXT_FORM(formData))
        } catch(err) {
            console.error(err);
        };
    }
};

