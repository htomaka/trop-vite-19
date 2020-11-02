const profileSelectors = {
    firstname: '#field-firstname',
    lastname: '#field-lastname',
    birthday: '#field-birthday',
    placeofbirth: '#field-placeofbirth',
    address: '#field-address',
    city: '#field-city',
    zipcode: '#field-zipcode',
    date: '#field-datesortie',
    heuresortie: '#field-heuresortie'
};

const reasonsSelectors = {
    enfant: '#checkbox-enfants',
    travail: '#checkbox-travail',
    achats: '#checkbox-achats',
    sante: '#checkbox-sante',
    famille: '#checkbox-famille',
    handicap: '#checkbox-handicap',
    sportAnimaux: '#checkbox-sport_animaux',
    convocation: '#checkbox-convocation',
    mission: '#checkbox-missions',
}

const submitSelector = '#generate-btn';


module.exports = {
    profileSelectors,
    reasonsSelectors,
    submitSelector
};