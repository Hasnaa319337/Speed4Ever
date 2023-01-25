<template>
  <v-container>
    <div style="padding:50px 0">
     

      <div class="chat_content_wrapper">
        
        <div class="messages_box" >
          <h2 class="head">{{ $t("misc.start the conversation") }}</h2>
            <div class="message_wrapper" :class="msg.message_position ==='me' ? 'sender': 'receiver'" v-for="msg in singlechat.slice().reverse()" :key="msg">
              <template v-if="msg.message_position == 'me' || msg.message_position == 'other' || pushMsg == true">
                <p class="text_message_content">{{ msg.message }}</p>
              </template>
            </div>

          <!-- <div class="message_wrapper receiver" :class="class_name" v-for="msg in singlechat.slice().reverse()" :key="msg">
            <p class="text_message_content" v-if="msg.message_position =='msgType' ">{{ msg.message }}</p>
          </div> -->
        </div>
        <form class="chat_input_wrapper" @submit.prevent="SendMsg">
          <div class="send_btn">
            <button class="confirm_btn" type="submit">
              <v-icon icon="mdi-send" />
            </button>
          </div>
          <div class="input_wrapper">
            <input
              type="text"
              :placeholder="$t('placeholder.write')"
              class="form-control"
              v-model="msgSent"
            />
          </div>
        </form>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  props: ["chat"],
  data() {
    return {
      msgSent: null,
      Product_id: this.$route.params.Product_id,
      Sender_id: this.$route.params.Sender_id,
      pushMsg: false,
      singlechat:[],
    };
  },
  // computed:{
  //   class_name() {
  //     let testClass = null

  //     this.singlechat.slice().reverse().forEach(element => {
  //       if(element.message_position == "me") {
  //         testClass = 'sender';
  //       } else if (element.message_position == "other") {
  //         testClass = 'reciver'
  //       } else {
  //         testClass = 'unknoun_prson'
  //       }
  //     });

  //     return testClass;
  //   }
  // },
  methods: {
    getSingleChat() {
      this.axios({
        method: "GET",
        url: `chats/${this.Product_id}/${this.Sender_id}`,
      })
        .then((res) => {
          this.singlechat = res.data.data;

          this.dataFetched = true;
        })
        .catch(() => {
     
        });
    },
    SendMsg() {
      console.log(this.Product_id, this.Sender_id);
      const form = new FormData();
      form.append("product_id", this.Product_id);
      form.append("receiver_id", this.Sender_id);
      form.append("message_type", "text");
      form.append("message", this.msgSent);

      this.axios({
        method: "POST",
        url: "chats",
        data: form,
      })
        .then(() => {
          this.pushMsg =true;
          this.$toast.success(`Send Successfully`);
          this.msgSent = '';
          this.getSingleChat();
        })
        .catch(() => {
         
        });
    },
  },
  mounted(){
    this.getSingleChat();

  }
};
</script>

<style scoped>
.head {
  font-family: Cairo-Medium;
  margin: 50px 0;
  text-align: center;
  font-size: 20px;
  color: #8d8d8d;
}

/* Start:: style chat component */

.chat_content_wrapper {
  position: relative;
  min-height: 90vh;
  max-height: 90vh;
  overflow-y: hidden;
  border-radius: 15px 15px 20px 20px;
}

.chat_content_wrapper .messages_box {
  min-height: 80vh;
  max-height: 80vh;
  overflow: auto;
}
.chat_content_wrapper .messages_box .message_wrapper {
  padding: 10px 0;
}
.chat_content_wrapper .messages_box .message_wrapper.sender {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  
}
.chat_content_wrapper .messages_box .message_wrapper .text_message_content {
  max-width: 75%;
  position: relative;
  margin: 0;
  padding: 10px 20px;
  font-size: 20px;
  font-family: Cairo-Regular;
  border-radius: 35px;
}
.chat_content_wrapper
  .messages_box
  .message_wrapper.sender
  .text_message_content {
  color: #313131;
  background-color: #f5ecff;
}
.messages_box .message_wrapper.receiver .text_message_content {
  color: #fff;
  background-color: #6c98a2;
}
.chat_content_wrapper .messages_box .message_wrapper.sender {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.chat_content_wrapper .messages_box .message_wrapper.receiver {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.chat_content_wrapper .chat_input_wrapper {
  margin-block: 15px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  -moz-column-gap: 10px;
  column-gap: 10px;
}
.chat_content_wrapper .chat_input_wrapper .send_btn {
  margin-bottom: 20px;
}
.confirm_btn {
  width: 50px;
  height: 50px;
}
.confirm_btn .mdi-send {
  width: 100%;
  margin: auto;
}
.chat_content_wrapper .chat_input_wrapper .input_wrapper {
  width: 100%;
  background-color: #f5ecff;
  border-radius: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0;
}
.chat_content_wrapper .chat_input_wrapper .input_wrapper input {
  background-color: transparent;
  border: 0;
  padding: 12px 20px;
  font-size: 20px;
  color: #313131;
  box-shadow: none;
}

/* End:: style chat component */
</style>
