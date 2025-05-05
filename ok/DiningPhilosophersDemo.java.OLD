import java.util.concurrent.Semaphore;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class DiningPhilosophersDemo {

    public static final int NUM_PHILOSOPHERS = 5;
    public static final int THINKING_TIME = 2000; // ms
    public static final int EATING_TIME = 1000; // ms

    public static void main(String[] args) {
        System.out.println("Choose a Dining Philosophers implementation:");
        System.out.println("(1) synchronized");
        System.out.println("(2) Semaphores");
        System.out.println("(3) ReentrantLock + Condition");

        try (java.util.Scanner scanner = new java.util.Scanner(System.in)) {
            int choice = scanner.nextInt();
            DiningPhilosophers table;

            switch (choice) {
                case 1:
                    table = new DiningPhilosophersSync();
                    System.out.println("Using synchronized monitor solution.");
                    break;
                case 2:
                    table = new DiningPhilosophersSem();
                    System.out.println("Using semaphore-based solution.");
                    break;
                case 3:
                    table = new DiningPhilosophersLock();
                    System.out.println("Using ReentrantLock + Condition[] solution.");
                    break;
                default:
                    System.out.println("Invalid choice. Defaulting to ReentrantLock solution.");
                    table = new DiningPhilosophersLock();
            }

            for (int i = 0; i < NUM_PHILOSOPHERS; i++) {
                int id = i;
                new Thread(() -> {
                    try {
                        while (true) {
                            System.out.println("Philosopher " + id + " is thinking...");
                            Thread.sleep((long) (Math.random() * THINKING_TIME));

                            table.pickup(id);
                            System.out.println("Philosopher " + id + " is eating...");
                            Thread.sleep((long) (Math.random() * EATING_TIME));

                            table.putdown(id);
                        }
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                        e.printStackTrace(); // Shows the full stack trace
                    }
                }).start();
            }
        }
    }

    // Common interface
    interface DiningPhilosophers {
        void pickup(int i) throws InterruptedException;

        void putdown(int i);
    }

    // -------------------------------------------
    // 1. Implementation using synchronized keyword
    // -------------------------------------------
    static class DiningPhilosophersSync implements DiningPhilosophers {
        private enum State {
            THINKING, HUNGRY, EATING
        }

        private final State[] state = new State[5];

        public DiningPhilosophersSync() {
            for (int i = 0; i < 5; i++) {
                state[i] = State.THINKING;
            }
        }

        public synchronized void pickup(int i) throws InterruptedException {
            state[i] = State.HUNGRY;
            test(i);
            while (state[i] != State.EATING) {
                // System.out.println("Philosopher " + i + " is waiting..."); // Log when philosopher is blocked
                wait();
                // System.out.println("Philosopher " + i + " woke up");
            }
        }

        public synchronized void putdown(int i) {
            state[i] = State.THINKING;
            test((i + 4) % 5);
            test((i + 1) % 5);
            notifyAll(); // Wake up all waiting philosophers; those not eligible to eat will go back to waiting
                         // If no threads are waiting, this call has no effect
        }

        private void test(int i) {
            int left = (i + 4) % 5;
            int right = (i + 1) % 5;
            if (state[i] == State.HUNGRY &&
                    state[left] != State.EATING &&
                    state[right] != State.EATING) {
                // System.out.println("Philosopher " + i + " is allowed to eat.");
                state[i] = State.EATING;
            }
        }
    }

    // -------------------------------------------
    // 2. Implementation using Semaphores
    // -------------------------------------------
    static class DiningPhilosophersSem implements DiningPhilosophers {
        private final Semaphore[] chopsticks = new Semaphore[5];

        public DiningPhilosophersSem() {
            for (int i = 0; i < 5; i++) {
                chopsticks[i] = new Semaphore(1); // Each chopstick is a binary semaphore
            }
        }

        public void pickup(int i) throws InterruptedException {
            int left = i;
            int right = (i + 1) % 5;

            // Acquire chopsticks in a fixed order to prevent deadlock
            if (i % 2 == 0) {
                // System.out.println("Philosopher " + i + " is waiting for left chopstick...");
                chopsticks[left].acquire();

                // System.out.println("Philosopher " + i + " is waiting for right chopstick...");
                chopsticks[right].acquire();
            } else {
                // System.out.println("Philosopher " + i + " is waiting for right chopstick...");
                chopsticks[right].acquire();

                // System.out.println("Philosopher " + i + " is waiting for left chopstick...");
                chopsticks[left].acquire();
            }
        }

        public void putdown(int i) {
            int left = i;
            int right = (i + 1) % 5;
            System.out.println("Philosopher " + i + " puts down chopsticks.");
            chopsticks[left].release();
            chopsticks[right].release();
        }

        // No need for test(): chopstick access is controlled directly by semaphores.
        // If a philosopher cannot acquire both, she simply blocks at acquire().
    }

    // -------------------------------------------
    // 3. Implementation using ReentrantLock + Condition[]
    // -------------------------------------------
    static class DiningPhilosophersLock implements DiningPhilosophers {
        private enum State {
            THINKING, HUNGRY, EATING
        }

        private final State[] state = new State[5];
        private final Lock lock = new ReentrantLock(true); // true = fair lock
        private final Condition[] self = new Condition[5];

        public DiningPhilosophersLock() {
            for (int i = 0; i < 5; i++) {
                state[i] = State.THINKING;
                self[i] = lock.newCondition(); // One condition per philosopher
            }
        }

        public void pickup(int i) throws InterruptedException {
            lock.lock();
            try {
                state[i] = State.HUNGRY;
                test(i);
                while (state[i] != State.EATING) {
                    // System.out.println("Philosopher " + i + " is waiting..."); // Log when philosopher is blocked
                    self[i].await(); // Wait on this philosopher's condition
                    // System.out.println("Philosopher " + i + " woke up");
                }
            } finally {
                lock.unlock();
            }
        }

        public void putdown(int i) {
            lock.lock();
            try {
                state[i] = State.THINKING;
                test((i + 4) % 5);
                test((i + 1) % 5);
            } finally {
                lock.unlock();
            }
        }

        private void test(int i) {
            int left = (i + 4) % 5;
            int right = (i + 1) % 5;
            if (state[i] == State.HUNGRY &&
                    state[left] != State.EATING &&
                    state[right] != State.EATING) {
                // System.out.println("Philosopher " + i + " is allowed to eat.");
                state[i] = State.EATING;
                self[i].signal(); // Wake up philosopher i if she is waiting; does nothing if she is not waiting
                                  // (i.e., if philosopher i is not currently blocked in await(), this call has no effect)
            }
        }
    }
}
