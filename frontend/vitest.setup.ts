// Reset DOM between tests
import { afterEach } from "vitest";

afterEach(() => {
  document.body.innerHTML = "";
});
