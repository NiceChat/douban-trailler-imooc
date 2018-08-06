const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev'

export const { default:parcel } =  require(`./${env}.js`)