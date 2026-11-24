// Sound disabled per user request
class SoundManager {
  public enabled = false;

  public playClick(_freq = 600, _duration = 0.02) {}

  public playSuccess() {}
}

export const sound = new SoundManager();
