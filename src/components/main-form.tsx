"use client"

import * as React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { toast } from "sonner"
import { Send, User, Mail, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormData } from "@/types"

interface MainFormProps {
  onSubmit?: (data: FormData) => void
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  message: Yup.string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters")
})

const initialValues: FormData = {
  name: "",
  email: "",
  message: ""
}

export function MainForm({ onSubmit }: MainFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleFormSubmit = async (values: FormData, { resetForm }: { resetForm: () => void }) => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      if (onSubmit) {
        onSubmit(values)
      }
      
      toast.success("Form submitted successfully!", {
        description: "Thank you for your message. We'll get back to you soon.",
      })
      
      resetForm()
    } catch {
      toast.error("Something went wrong!", {
        description: "Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Contact Us</h2>
        <p className="text-muted-foreground">
          Fill out the form below and we&apos;ll get back to you.
        </p>
      </div>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ errors, touched, isSubmitting: formikSubmitting }) => (
          <Form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Field
                  as={Input}
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="pl-10"
                  aria-invalid={errors.name && touched.name ? "true" : "false"}
                  aria-describedby={errors.name && touched.name ? "name-error" : undefined}
                />
              </div>
              <ErrorMessage name="name">
                {msg => <p id="name-error" className="text-sm text-destructive" role="alert">{msg}</p>}
              </ErrorMessage>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Field
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10"
                  aria-invalid={errors.email && touched.email ? "true" : "false"}
                  aria-describedby={errors.email && touched.email ? "email-error" : undefined}
                />
              </div>
              <ErrorMessage name="email">
                {msg => <p id="email-error" className="text-sm text-destructive" role="alert">{msg}</p>}
              </ErrorMessage>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">
                Message
              </Label>
              <div className="relative">
                <MessageCircle className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Enter your message"
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                  aria-invalid={errors.message && touched.message ? "true" : "false"}
                  aria-describedby={errors.message && touched.message ? "message-error" : undefined}
                />
              </div>
              <ErrorMessage name="message">
                {msg => <p id="message-error" className="text-sm text-destructive" role="alert">{msg}</p>}
              </ErrorMessage>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting || formikSubmitting}
            >
              {isSubmitting || formikSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
