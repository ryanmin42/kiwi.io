import Vue from 'vue';
import login from '@/components/login';

describe('login.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(login);
    const vm = new Constructor().$mount();
    expect(vm.$el.querySelector('.hello h1').textContent);
  });
});
