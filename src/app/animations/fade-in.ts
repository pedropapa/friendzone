import {Animation} from '@ionic/core';

export function FadeTransition(AnimationC: Animation, baseEl: HTMLElement) {
  const enteringView = this.enteringView;
  const leavingView = this.leavingView;

  if (enteringView && enteringView.pageRef()) {
    console.log('enteringView && enteringView.pageRef()');

    const ele = enteringView.pageRef().nativeElement;
    const wrapper = new AnimationC();

    wrapper.addElement(ele.querySelector('.modal-wrapper'));

    wrapper.fromTo('transform', 'scale(1)', 'scale(1)', false);
    wrapper.fromTo('opacity', 0, 1, false);

    this
      .element(enteringView.pageRef())
      .duration(500)
      .easing('cubic-bezier(.1, .7, .1, 1)')
      .add(wrapper);
  }

  if (leavingView && leavingView.pageRef()) {
    console.log('leavingView && leavingView.pageRef()');

    const ele = leavingView.pageRef().nativeElement;
    const wrapper = new AnimationC();

    wrapper.addElement(ele.querySelector('.modal-wrapper'));

    wrapper.fromTo('transform', 'scale(1)', 'scale(1)', true);
    wrapper.fromTo('opacity', 1, 0, true);

    this
      .element(leavingView.pageRef())
      .duration(1000)
      .easing('cubic-bezier(.1, .7, .1, 1)')
      .add(wrapper);
  }
}
