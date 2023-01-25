<template v-if="dataFetched">
  <div>
    <HeadCard />

    <!-- Start:: All Chats -->
    <div>
      <v-container>
        <!--Start:: All chats -->
        <ul class="rates_list" v-if="only_chat">
          <li
            class="rate_route_wrapper"
            v-for="chat in chats"
            :key="chat.chat_id"
          >
            <router-link
              :to="{
                name: 'SingleChat',
                params: {
                  Product_id: chat.product.id,
                  Sender_id: chat.sender_data.id,
                },
              }"
              style="color: rgb(49 49 49 / 49%); font-family: Cairo-Regular"
            >
              <div class="rate_content" @click="changePath">
                <div class="avatar_wrapper">
                  <img
                    :src="chat.product.main_image"
                    :alt="chat.product.user.username"
                    width="90"
                    height="90"
                  />
                </div>
                <div class="rate_details_wrapper">
                  <div class="name_and_rate_date_wrapper">
                    <h5 class="name">
                      {{ chat.product.user.username }}
                    </h5>

                    <h6 class="rate_date_wrapper">
                      {{ chat.created_at }}
                    </h6>
                  </div>
                  <h6 class="comment_text">{{ chat.last_message }}</h6>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
        <!-- End:: All Chats -->

        <!-- Start:: Chat Message Box -->
        <SingleChat v-else />
        <!-- End:: Chat Message Box -->
      </v-container>
    </div>
    <!-- End:: All Chats -->
  </div>
</template>

<script>
import HeadCard from "@/components/HeadCard.vue";
import SingleChat from "@/views/UserInformation/SingleChat.vue";

export default {
  components: { HeadCard, SingleChat },
  data() {
    return {
      chats: null,
      dataFetched: false,
      only_chat: true,
    };
  },

  methods: {
    getChats() {
      this.axios({
        method: "GET",
        url: "chats",
      })
        .then((res) => {
          this.chats = res.data.data;

          this.dataFetched = true;
        })
        .catch(() => {
        
        });
    },
  
    changePath() {
      this.only_chat = !this.only_chat;
    },
  },
    mounted() {
    this.getChats();
  },
};
</script>

<style scoped>
/* Start:: comments css */
.rates_list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.rate_content {
  width: 98%;

  padding: 20px;
  margin-block: 10px;
  border: 2px solid #f1f1f1;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: auto;
  column-gap: 15px;
  border-radius: 10px;
  overflow-x: hidden;
}
.rate_content:hover {
  background: #f3f3f3;
  cursor: pointer;
}

.rate_route_wrapper {
  margin: 0;
  float: none;
}
.avatar_wrapper img {
  border-radius: 50%;

  object-fit: cover;
}
.rate_details_wrapper {
  width: 100%;
}
.name_and_rate_date_wrapper {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.comment_text {
  color: #313131;
  max-width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* End:: comments  */
</style>
