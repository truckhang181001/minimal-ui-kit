import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { Stack, Card } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import useLocales from '../../../../hooks/useLocales';

export default function AccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar();
  const { translate } = useLocales();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required(translate('oldPassword')),
    newPassword: Yup.string().min(6, translate('passwordLeastCharacters')).required(translate('newPasswordRequired')),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], translate('passwordMustMatch')),
  });

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(translate('updateSuccess'));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <RHFTextField name="oldPassword" type="password" label={translate('oldPassword')} />

          <RHFTextField name="newPassword" type="password" label={translate('newPassword')} />

          <RHFTextField name="confirmNewPassword" type="password" label={translate('confirmNewPassword')} />

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {translate('saveChanges')}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
