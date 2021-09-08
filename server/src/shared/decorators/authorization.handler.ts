/*
 * @Author: Hasi6 (hasitha.chandula@gmail.com)
 * @Date: 2021-06-05 20:58:38
 * @Last Modified by:   Hasi6 (hasitha.chandula@gmail.com)
 * @Last Modified time: 2021-06-05 20:58:38
 */

function authorizationHandler(): (
  target: object,
  functionName: string,
  descriptor: PropertyDescriptor
) => PropertyDescriptor {
  return function (
    _target: object,
    _functionName: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod: any = descriptor.value;

    descriptor.value = async function (...args: any) {
      try {
        // Execute the actual method wrapped in the audit decorator and get the output
        const output: object = await originalMethod.apply(this, args);
        return output;
      } catch (error) {
        throw error;
      }
    };

    return descriptor;
  };
}
export { authorizationHandler as AuthorizationHandler };
