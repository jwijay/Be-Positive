BloodType = {
  
  AB_POS : "AB_POS",
  AB_NEG : "AB_NEG",
  A_POS  : "A_POS",
  A_NEG  : "A_NEG",
  B_POS  : "B_POS",
  B_NEG  : "B_NEG",
  O_POS  : "O_POS",
  O_NEG  : "O_NEG"

};

BloodTransfusionRules = {
  
  /**
   * Set the simulation speed.
   * @type {Number} : Valid values between 1 and 200
   */
  simulation_speed : 200,

  /**
   * returns BloodType, or false to give no BloodType
   * 
   * @name receive_patient
   * @param {Bank} blood_inventory
   * @param {Patient} patient
   * @returns {BloodType or false}
   *
   * Patient properties {
   *   gender : String, (MALE,FEMALE)
   *   blood_type : String (BloodType)
   * }
   * 
   * Bank properties {
   *   AB_POS : Integer,
   *   AB_NEG : Integer,
   *   A_POS  : Integer,
   *   A_NEG  : Integer,
   *   B_POS  : Integer,
   *   B_NEG  : Integer,
   *   O_POS  : Integer,
   *   O_NEG  : Integer
   * }
   * 
   */
  
  check_stock : function(blood_inventory, compatible_types) {
    for (var i = 0; i < compatible_types.length; i++) {
      if (blood_inventory[compatible_types[i]] > 0) {
        return compatible_types[i];
      }
    }

    //no compatible type found. just return the first blood type even if it's not in stock.
    return compatible_types[0];
  },

  receive_patient : function (blood_inventory, patient) {

    var compatible_types = [];

    switch (patient.blood_type) {
      case BloodType.O_POS:
        compatible_types = [BloodType.O_POS, BloodType.O_NEG];
        break;
      case BloodType.A_POS:
        compatible_types = [BloodType.A_POS, BloodType.O_POS, BloodType.A_NEG, BloodType.O_NEG];
        break;
      case BloodType.B_POS:
        compatible_types = [BloodType.B_POS, BloodType.O_POS, BloodType.B_NEG, BloodType.O_NEG];
        break;
      case BloodType.AB_POS:
        compatible_types = [BloodType.A_POS, BloodType.B_POS, BloodType.AB_POS, BloodType.O_POS, BloodType.A_NEG, BloodType.B_NEG, BloodType.AB_NEG, BloodType.O_NEG];
        break;
      case BloodType.O_NEG:
        compatible_types = [BloodType.O_NEG];
        break;
      case BloodType.A_NEG:
        compatible_types = [BloodType.A_NEG, BloodType.O_NEG];
        break;
      case BloodType.B_NEG:
        compatible_types = [BloodType.B_NEG, BloodType.O_NEG];
        break;
      case BloodType.AB_NEG:
        compatible_types = [BloodType.A_NEG, BloodType.B_NEG, BloodType.AB_NEG, BloodType.O_NEG];
        break;
    }
    
    //Check bank stock
    return this.check_stock(blood_inventory, compatible_types);
  }

};