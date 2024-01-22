const browserUrl = "package://rage-lock-break/index.html"; // Replace it with your path
let browser = null;

// This is for personal tests, if you don't need this one, just delete it
mp._events.add("playerCommand", (command) => {
  const args = command.split(/[ ]+/);
	const commandName = args[0];

	args.shift();

  if (commandName == "open_lock_break") {
    mp.events.call("Client:LockBreak:Open");
    return true;
  }
  if (commandName == "create_lock_pick") {
    mp.events.call("Client:LockBreak:CreateLockpick");
    return true;
  }
})

// Trigger this event when you need to display the lockpicking interface
mp.events.add("Client:LockBreak:Open", () => {
  if (browser) {
    browser.destroy();
    browser = null;
  }

  browser = mp.browsers.new(browserUrl);
  setTimeout(() => { // The mp.gui.cursor.show method does not want to work without delay
    mp.gui.cursor.show(true, true);
  }, 500)
})

// Trigger this event yourself if you need to forcibly close the lock breaking
mp.events.add("Client:LockBreak:Canceled", () => {
  if (browser) {
    browser.destroy();
    browser = null;
    setTimeout(() => { // The mp.gui.cursor.show method does not want to work without delay
      mp.gui.cursor.show(false, false);
    }, 500)
  }

  mp.gui.chat.push("Lockbreak script canceled"); // Replace it with your code
})

// Use it to issue a new lock pick if the old one is broken
mp.events.add("Client:LockBreak:CreateLockpick", () => {
  mp.gui.chat.push("Lockpick created");
  if (browser) {
    browser.execute("createLockpick()");
  }
})

mp.events.add("Client:LockBreak:KeyholeLockOpened", () => {
  mp.gui.chat.push("Lock opened"); // Replace it with your code
})

mp.events.add("Client:LockBreak:LockpickBroken", () => {
  mp.gui.chat.push("Lockpick broken"); // Replace it with your code
})