<template>
d
</template>
<script>
export default {
  props:['visibleRight'],
  data: () => ({
    items: [
      { src: "/publishments", text: "$t('buttons.ads')", icon: "mdi-mailbox" },
      { src: "/my-auctions", text: "مزاداتي", icon: "mdi-gavel" },
      { src: "/faqs", text: "الأسئلة الشائعة", icon: "mdi-help" },
      {
        src: "/privacy-policy",
        text: "سياسة الخصوصية",
        icon: "mdi-file-document-outline",
      },
    ],


  }),

  

  methods: {
    logout() {
      this.$store.commit("AuthModules/Logout");
      this.$toast.success(`You Logout Successfully`);
    },
  },
};
</script>

<style lang="scss">


</style>
