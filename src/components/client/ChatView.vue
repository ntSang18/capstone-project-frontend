<template>
  <div id="chat">
    <button :class="hide ? 'trigger-btn' : 'trigger-btn hide'" @click="openChat()">
      <img src="@/assets/images/icon/chat.png" />
      <h2>Chat</h2>
      <!-- <p class="num">9+</p> -->
    </button>
    <div :class="hide ? 'chat-container hide' : 'chat-container'">
      <div class="header">
        <div class="title">
          <h3>Chat</h3>
          <p>(8)</p>
        </div>
        <el-tooltip content="Thu gọn" placement="top">
          <img src="@/assets/images/icon/collapse.png" class="collapse-btn" @click="closeChat()" />
        </el-tooltip>
      </div>
      <div class="body">
        <div class="list-conversation">
          <div class="list-header">
            <div class="search">
              <i class="bx bx-search"></i>
              <input type="search" placeholder="Tìm kiếm" />
            </div>
          </div>
          <ul class="list-item">
            <li
              v-for="con in listConversation"
              :key="con[0]"
              :class="conversation[0] === con[0] ? 'conversation-item picked' : 'conversation-item'"
              @click="pickConversation(con)"
            >
              <div class="img-container">
                <img
                  v-if="con[1].senderId === user.id && con[1].receiverImg"
                  :src="con[1].receiverImg"
                />
                <img
                  v-else-if="con[1].senderId !== user.id && con[1].senderImg"
                  :src="con[1].senderImg"
                />
                <img v-else src="@/assets/images/default/user.png" />
                <div
                  v-if="con[1].senderId === user.id"
                  :class="isUserOnline(con[1].receiverId) ? 'dot' : 'dot off'"
                ></div>
                <div v-else :class="isUserOnline(con[1].senderId) ? 'dot' : 'dot off'"></div>
              </div>
              <div class="item-content">
                <div class="item-header">
                  <h4 v-if="con[1].senderId === user.id" class="name">{{ con[1].receiverName }}</h4>
                  <h4 v-else class="name">{{ con[1].senderName }}</h4>
                  <p class="time">{{ timeStamp(con[1].timeStamp) }}</p>
                </div>
                <span class="last-message">{{ con[1].lastMessage }}</span>
              </div>
            </li>
          </ul>
        </div>
        <div v-if="conversation.length || receiver" class="chat-box">
          <div class="box-header">
            <div v-if="conversation.length" class="header-container">
              <div class="img-container">
                <img
                  v-if="conversation[1].senderId === user.id && conversation[1].receiverImg"
                  :src="conversation[1].receiverImg"
                />
                <img
                  v-else-if="conversation[1].receiverId === user.id && conversation[1].senderImg"
                  :src="conversation[1].senderImg"
                />
                <img v-else src="@/assets/images/default/user.png" />
                <div
                  v-if="conversation[1].senderId === user.id"
                  :class="isUserOnline(conversation[1].receiverId) ? 'dot' : 'dot off'"
                ></div>
                <div
                  v-else
                  :class="isUserOnline(conversation[1].senderId) ? 'dot' : 'dot off'"
                ></div>
              </div>
              <div class="text">
                <h4 v-if="conversation[1].senderId === user.id" class="name">
                  {{ conversation[1].receiverName }}
                </h4>
                <h4 v-else class="name">
                  {{ conversation[1].senderName }}
                </h4>
                <p v-if="conversation[1].senderId === user.id" class="status">
                  {{ isUserOnline(conversation[1].receiverId) ? 'Online' : 'Offline' }}
                </p>
                <p v-else class="status">
                  {{ isUserOnline(conversation[1].senderId) ? 'Online' : 'Offline' }}
                </p>
              </div>
            </div>
            <div v-else class="header-container">
              <div class="img-container">
                <img v-if="receiver.image_url" :src="receiver.image_url" />
                <img v-else src="@/assets/images/default/user.png" />
                <div :class="isUserOnline(receiver.id) ? 'dot' : 'dot off'"></div>
              </div>
              <div class="text">
                <h4 class="name">
                  {{ receiver.username }}
                </h4>
                <p class="status">{{ isUserOnline(receiver.id) ? 'Online' : 'Offline' }}</p>
              </div>
            </div>
          </div>
          <div class="box-body">
            <ul id="scroll" class="list-message">
              <li
                v-for="chat in listChat"
                :key="chat[0]"
                :class="chat[1].senderId === user.id ? 'message-item' : 'message-item receive'"
              >
                <p class="message">{{ chat[1].message }}</p>
                <p class="time">{{ fullTimeStamp(chat[1].timeStamp) }}</p>
              </li>
            </ul>
          </div>
          <div class="box-footer">
            <div class="box-message">
              <textarea rows="2" placeholder="Nhập nội dung tin nhắn" v-model="message"></textarea>
              <button @click="send()"><i class="bx bx-send"></i></button>
            </div>
          </div>
        </div>
        <div v-else class="chat-box-empty">
          <img src="@/assets/images/background/bg-chat.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { database, ref, onValue, set, push } from '@/services/FirebaseService';
import { timeStamp, fullTimeStamp } from '@/utils/dateFormatter';
import { mapState } from 'vuex';
export default {
  props: {
    receiver: Object,
    hide: Boolean,
  },
  data() {
    return {
      conversations: [],
      chats: [],
      message: '',
      conversation: [],
      firebaseUsers: [],
    };
  },
  mounted() {
    if (this.user) {
      this.getConversations();
      this.getChats();
      this.getFirebaseUsers();
    }
  },
  computed: {
    ...mapState('client', ['user']),
    listConversation() {
      return this.conversations.filter(
        con => con[1].senderId === this.user.id || con[1].receiverId === this.user.id,
      );
    },
    listChat() {
      if (this.conversation.length) {
        return this.chats.filter(
          chat =>
            (chat[1].senderId === this.conversation[1].senderId &&
              chat[1].receiverId === this.conversation[1].receiverId) ||
            (chat[1].senderId === this.conversation[1].receiverId &&
              chat[1].receiverId === this.conversation[1].senderId),
        );
      } else if (this.receiver) {
        return this.chats.filter(
          chat =>
            (chat[1].senderId === this.user.id && chat[1].receiverId === this.receiver.id) ||
            (chat[1].senderId === this.receiver.id && chat[1].receiverId === this.user.id),
        );
      } else {
        return [];
      }
    },
  },
  methods: {
    timeStamp,
    fullTimeStamp,
    getFirebaseUsers() {
      onValue(ref(database, 'users'), snapshot => {
        if (snapshot.exists()) {
          this.firebaseUsers = Object.keys(snapshot.val()).map(key => [key, snapshot.val()[key]]);
        }
      });
    },
    getConversations() {
      onValue(ref(database, 'conversations'), snapshot => {
        if (snapshot.exists()) {
          this.conversations = Object.keys(snapshot.val()).map(key => [key, snapshot.val()[key]]);
        }
      });
    },
    getChats() {
      onValue(ref(database, 'chats'), snapshot => {
        if (snapshot.exists()) {
          this.chats = Object.keys(snapshot.val()).map(key => [key, snapshot.val()[key]]);
        }
      });
    },
    pushChat() {
      let now = new Date();
      if (this.conversation.length) {
        const receiverId =
          this.user.id === this.conversation[1].senderId
            ? this.conversation[1].receiverId
            : this.conversation[1].senderId;
        push(ref(database, 'chats'), {
          timeStamp: now.toString(),
          receiverId: receiverId,
          senderId: this.user.id,
          message: this.message,
          status: false,
        });
      } else {
        push(ref(database, 'chats'), {
          timeStamp: now.toString(),
          receiverId: this.receiver.id,
          senderId: this.user.id,
          message: this.message,
          status: false,
        });
      }
    },
    pushConversation() {
      let now = new Date();
      const obj = {
        timeStamp: now.toString(),
        receiverId: this.receiver.id,
        receiverImg: this.receiver.image_url,
        receiverName: this.receiver.username,
        senderId: this.user.id,
        senderImg: this.user.image_url,
        senderName: this.user.username,
        lastMessage: this.message,
      };
      const key = push(ref(database, 'conversations'), { ...obj }).key;
      this.conversation = [key, obj];
    },
    setConversation() {
      let now = new Date();
      const obj = { ...this.conversation[1] };
      obj.timeStamp = now.toString();
      obj.lastMessage = this.message;
      set(ref(database, `conversations/${this.conversation[0]}`), { ...obj });
    },
    send() {
      if (this.conversation.length) {
        this.setConversation();
        this.pushChat();
      } else {
        this.pushConversation();
        this.alreadyHaveConversation = true;
        this.pushChat();
      }
      this.message = '';
    },
    scroll() {
      var container = this.$el.querySelector('#scroll');
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },
    isUserOnline(id) {
      const firebaseUser = this.firebaseUsers.find(el => el[1].id === id);
      return firebaseUser[1].availability;
    },
    pickConversation(item) {
      this.conversation = item;
      this.$nextTick(() => this.scroll());
    },
    openChat() {
      this.$emit('triggerChat', false);
    },
    closeChat() {
      this.$emit('triggerChat', true);
    },
  },
  watch: {
    listChat() {
      this.$nextTick(() => this.scroll());
    },
  },
};
</script>

<style scoped src="@/assets/styles/client/chat.css"></style>
