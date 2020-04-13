import React from 'react'
import { Button, FormHelperText, TextField } from '@material-ui/core'
import { SubmitContactFormDocument } from '../../generated/apollo'
import { useMutationForm, emailPattern, phonePattern } from '../../lib/apollo-form'
import useContactStyles from './useContactStyles'

const ContactForm: React.FC = () => {
  const classes = useContactStyles()
  const {
    onSubmit,
    errors,
    register,
    required,
    result: { error, data, loading },
  } = useMutationForm<GQLSubmitContactFormMutation, GQLSubmitContactFormMutationVariables>(
    SubmitContactFormDocument,
  )

  const subjects: { [K in GQLContactSubject]: string } = {
    COLLABORATION: 'Samenwerking',
    MODULE: 'Module',
    NEW_PROJECT: 'Nieuw Project',
    VACANCY: 'Vacature',
    OTHER: 'Anders',
  }

  return (
    <>
      <form noValidate onSubmit={onSubmit} className={classes.form}>
        <TextField
          variant='filled'
          error={!!errors.name}
          label='Naam'
          name='name'
          className={classes.name}
          required={required.name}
          inputRef={register({ required: required.name })}
          helperText={errors?.name?.message}
        />

        <TextField
          variant='filled'
          type='email'
          error={!!errors.email}
          label='Emailadres'
          name='email'
          className={classes.email}
          required={required.email}
          inputRef={register({
            required: required.email,
            pattern: { value: emailPattern, message: 'Emailadres is ongeldig' },
          })}
          helperText={errors?.email?.message}
        />

        <TextField
          variant='filled'
          type='tel'
          error={!!errors.phoneNumber}
          label='Telefoonnummer'
          name='phoneNumber'
          className={classes.phoneNumber}
          required={required.phoneNumber}
          inputRef={register({
            required: required.phoneNumber,
            pattern: { value: phonePattern, message: 'Telefoonnummer is ongeldig' },
          })}
          helperText={errors?.phoneNumber?.message}
        />

        <TextField
          variant='filled'
          select
          SelectProps={{ native: true }}
          error={!!errors.subject}
          label='Onderwerp'
          name='subject'
          className={classes.subject}
          required={required.subject}
          inputRef={register({ required: required.subject })}
          helperText={errors?.subject?.message}
        >
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label*/}
          {!required.subject && <option value='' />}
          {Object.entries(subjects).map(([value, label]) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </TextField>

        <TextField
          variant='filled'
          multiline
          className={classes.message}
          error={!!errors.message}
          label='Bericht'
          name='message'
          inputProps={{ style: { minHeight: 'calc(10em * 1.1876)' } }}
          required={required.message}
          inputRef={register({ required: required.message })}
          helperText={errors?.subject?.message}
        />

        <div className={classes.submit}>
          {error && (
            <FormHelperText error>
              {error.message} Please email to info@reachdigital.nl
            </FormHelperText>
          )}
          {data?.createContactForm?.id && <FormHelperText>Bedankt voor je bericht</FormHelperText>}
          {data?.createContactForm === null && (
            <FormHelperText error>
              Message was send, but couldn&apos;t be saved.. Please email to info@reachdigital.nl
            </FormHelperText>
          )}
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={loading || !!data?.createContactForm?.id}
          >
            Submit
          </Button>
        </div>
      </form>
    </>
  )
}

export default ContactForm