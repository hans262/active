/**
 * NonNullable ->
 * 从T中排除空值和undefined
 */

namespace TestNonNullable {
  type T1 = NonNullable<string | number | undefined | null>
}
