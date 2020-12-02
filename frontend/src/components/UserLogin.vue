<template>
  <v-container>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col
          cols="12"
          md="12">
          <v-text-field
          v-model="hkid"
          :rules="[isHKID]"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="香港身分證號碼"
          @click:append="show1 = !show1"
          ></v-text-field>

          <v-checkbox
          v-model="checkbox"
          :rules="[v => !!v || '必須同意才可登入']"
          label="本人明白並同意貴公司收集本人的香港身份證作核實身份及投票用途"
          required
          ></v-checkbox>
          <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="verification">
          登入</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</v-container>
</template>

<script>
export default {
  name: 'UserLogin',

  data:function () {
    return {
      checkbox: false,
      dialog: false,
      valid: true,
      show1: false,
      hkid: ''
    }
  },
  methods: {
    verification () {
      this.$store.dispatch('verification', this.hkid)
    },
    isHKID: (str) => {
      const strValidChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      str = str.replace(/\(\)'+/g,'')
      // basic check length
      if (str.length < 8)
      return '身份證格式錯誤';

      // handling bracket
      if (str.charAt(str.length-3) == '(' && str.charAt(str.length-1) == ')')
      str = str.substring(0, str.length - 3) + str.charAt(str.length -2);

      // convert to upper case
      str = str.toUpperCase();

      // regular expression to check pattern and split
      const hkidPat = /^([A-Z]{1,2})([0-9]{6})([A0-9])$/;
      const matchArray = str.match(hkidPat);

      // not match, return false
      if (matchArray == null)
      return '身份證格式錯誤';

      // the character part, numeric part and check digit part
      const charPart = matchArray[1];
      const numPart = matchArray[2];
      const checkDigit = matchArray[3];

      // calculate the checksum for character part
      let checkSum = 0;
      if (charPart.length == 2) {
        checkSum += 9 * (10 + strValidChars.indexOf(charPart.charAt(0)));
        checkSum += 8 * (10 + strValidChars.indexOf(charPart.charAt(1)));
      } else {
        checkSum += 9 * 36;
        checkSum += 8 * (10 + strValidChars.indexOf(charPart));
      }

      // calculate the checksum for numeric part
      for (let i = 0, j = 7; i < numPart.length; i++, j--)
      checkSum += j * numPart.charAt(i);

      // verify the check digit
      const remaining = checkSum % 11;
      let verify = remaining == 0 ? 0 : 11 - remaining;
      if( verify == checkDigit || (verify == 10 && checkDigit == 'A') ){
        return true
      } else {
        return '身份證格式錯誤';
      }
    }
  }
}
</script>
