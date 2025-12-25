<script>
import {format} from 'date-fns'
import axios from 'axios'
import MailView from './MailView.vue'
import ModalView from "./ModalView.vue";

export default {

  name: "MailTable",
  components: {ModalView, MailView},
  async setup() {
    let {data: emails} = await axios.get('http://localhost:3000/emails')
    return {
      format,
      emails,
      openedEmail: null
    }
  },
  computed: {
    sortedEmails() {
      return this.emails.sort((e1, e2) => {
        return e1.sentAt < e2.sentAt ? 1 : -1
      })
    },
    unarchivedEmails() {
      return this.sortedEmails.filter(email => !email.archived)
    }
  },
  methods: {
    openEmail(email) {
      email.read = true
      this.openedEmail = email
      this.updateEmail(email)
    },
    archiveEmail(email) {
      email.archived = true
      this.updateEmail(email)

    },
    updateEmail(email) {
      axios.put(`http://localhost:3000/emails/${email.id}`, email)
    },
  }
}
</script>

<template>
    <table class="mail-table">
      <tbody>
      <tr v-for="email in unarchivedEmails" :key="email.id"
          :class="['clickable', email.read ? 'read' : '']"
          @click="openEmail(email)">
        <td><input type="checkbox"/></td>
        <td>{{ email.from }}</td>

        <td>
          <p><strong>{{ email.subject }}</strong> - {{ email.body }} </p>
        </td>

        <td class="date">{{ format(new Date(email.sentAt), 'MMM do yyyy') }}</td>
        <td>
          <button @click="archiveEmail(email)">Archive</button>
        </td>

      </tr>
      </tbody>
    </table>
    <ModalView v-if="openedEmail">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis enim excepturi expedita iste perferendis quis quos sint. Cumque doloremque ipsum quam. Aliquid autem dicta ea eius enim explicabo laudantium pariatur!</p>
      <MailView :email="openedEmail"/>
    </ModalView>

</template>

<style scoped>

</style>
