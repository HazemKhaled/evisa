"use client";

import { useEffect } from "react";

/**
 * Handles WebMCP Declarative Form actions and agent interactions globally.
 * Listens to document submit events to intercept agent-invoked form submissions
 * and resolve them using e.respondWith.
 */
export function WebMcpDeclarative() {
  useEffect(() => {
    const handleSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement;
      const toolName = form.getAttribute("toolname");

      if (toolName === "submit_contact_form") {
        const agentEvent = e as Event & {
          agentInvoked?: boolean;
          respondWith?: (promise: Promise<unknown>) => void;
        };

        const responseData = {
          success: true,
          message:
            "Thank you for reaching out. Your message has been successfully submitted.",
        };

        if (
          agentEvent.agentInvoked &&
          typeof agentEvent.respondWith === "function"
        ) {
          e.preventDefault();
          const formData = new FormData(form);
          const data = Object.fromEntries(formData.entries());

          agentEvent.respondWith(
            Promise.resolve({
              ...responseData,
              submittedFields: data,
            })
          );
        } else {
          // Standard human form submission: prevent actual page reload/get and alert success
          e.preventDefault();
          alert(responseData.message);
          form.reset();
        }
      }
    };

    document.addEventListener("submit", handleSubmit);
    return () => {
      document.removeEventListener("submit", handleSubmit);
    };
  }, []);

  return null;
}
