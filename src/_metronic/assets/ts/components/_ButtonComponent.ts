export class ButtonComponent {
  public static bootstrap() {
    const buttonsGroup = Array.from(
      document.querySelectorAll('[data-kt-buttons="true"]')
    );

    buttonsGroup.forEach((group) => {
      if (group.getAttribute("data-kt-initialized") === "1") {
        return;
      }

      const selector = group.hasAttribute("data-kt-buttons-target")
        ? group.getAttribute("data-kt-buttons-target") || ".btn"
        : ".btn";
      const activeButtons = Array.from(group.querySelectorAll(selector));

      // Toggle Handler
      activeButtons.forEach((button) => {
        button.addEventListener("click", function (e) {
          activeButtons.forEach((button) => {
            button.classList.remove("active");
          });

          button.classList.add("active");
        });
      });

      group.setAttribute("data-kt-initialized", "1");
    });
  }
}
